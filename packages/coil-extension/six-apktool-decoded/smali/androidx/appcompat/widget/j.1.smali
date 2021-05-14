.class Landroidx/appcompat/widget/j;
.super Ljava/lang/Object;
.source ""


# instance fields
.field private final a:Landroid/view/View;

.field private final b:Landroidx/appcompat/widget/o;

.field private c:I

.field private d:Landroidx/appcompat/widget/ra;

.field private e:Landroidx/appcompat/widget/ra;

.field private f:Landroidx/appcompat/widget/ra;


# direct methods
.method constructor <init>(Landroid/view/View;)V
    .locals 1

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    const/4 v0, -0x1

    iput v0, p0, Landroidx/appcompat/widget/j;->c:I

    iput-object p1, p0, Landroidx/appcompat/widget/j;->a:Landroid/view/View;

    invoke-static {}, Landroidx/appcompat/widget/o;->a()Landroidx/appcompat/widget/o;

    move-result-object p1

    iput-object p1, p0, Landroidx/appcompat/widget/j;->b:Landroidx/appcompat/widget/o;

    return-void
.end method

.method private b(Landroid/graphics/drawable/Drawable;)Z
    .locals 3

    iget-object v0, p0, Landroidx/appcompat/widget/j;->f:Landroidx/appcompat/widget/ra;

    if-nez v0, :cond_0

    new-instance v0, Landroidx/appcompat/widget/ra;

    invoke-direct {v0}, Landroidx/appcompat/widget/ra;-><init>()V

    iput-object v0, p0, Landroidx/appcompat/widget/j;->f:Landroidx/appcompat/widget/ra;

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/widget/j;->f:Landroidx/appcompat/widget/ra;

    invoke-virtual {v0}, Landroidx/appcompat/widget/ra;->a()V

    iget-object v1, p0, Landroidx/appcompat/widget/j;->a:Landroid/view/View;

    invoke-static {v1}, La/g/i/s;->b(Landroid/view/View;)Landroid/content/res/ColorStateList;

    move-result-object v1

    const/4 v2, 0x1

    if-eqz v1, :cond_1

    iput-boolean v2, v0, Landroidx/appcompat/widget/ra;->d:Z

    iput-object v1, v0, Landroidx/appcompat/widget/ra;->a:Landroid/content/res/ColorStateList;

    :cond_1
    iget-object v1, p0, Landroidx/appcompat/widget/j;->a:Landroid/view/View;

    invoke-static {v1}, La/g/i/s;->c(Landroid/view/View;)Landroid/graphics/PorterDuff$Mode;

    move-result-object v1

    if-eqz v1, :cond_2

    iput-boolean v2, v0, Landroidx/appcompat/widget/ra;->c:Z

    iput-object v1, v0, Landroidx/appcompat/widget/ra;->b:Landroid/graphics/PorterDuff$Mode;

    :cond_2
    iget-boolean v1, v0, Landroidx/appcompat/widget/ra;->d:Z

    if-nez v1, :cond_4

    iget-boolean v1, v0, Landroidx/appcompat/widget/ra;->c:Z

    if-eqz v1, :cond_3

    goto :goto_0

    :cond_3
    const/4 p1, 0x0

    return p1

    :cond_4
    :goto_0
    iget-object v1, p0, Landroidx/appcompat/widget/j;->a:Landroid/view/View;

    invoke-virtual {v1}, Landroid/view/View;->getDrawableState()[I

    move-result-object v1

    invoke-static {p1, v0, v1}, Landroidx/appcompat/widget/o;->a(Landroid/graphics/drawable/Drawable;Landroidx/appcompat/widget/ra;[I)V

    return v2
.end method

.method private d()Z
    .locals 4

    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/4 v1, 0x1

    const/4 v2, 0x0

    const/16 v3, 0x15

    if-le v0, v3, :cond_1

    iget-object v0, p0, Landroidx/appcompat/widget/j;->d:Landroidx/appcompat/widget/ra;

    if-eqz v0, :cond_0

    goto :goto_0

    :cond_0
    move v1, v2

    :goto_0
    return v1

    :cond_1
    if-ne v0, v3, :cond_2

    return v1

    :cond_2
    return v2
.end method


# virtual methods
.method a()V
    .locals 3

    iget-object v0, p0, Landroidx/appcompat/widget/j;->a:Landroid/view/View;

    invoke-virtual {v0}, Landroid/view/View;->getBackground()Landroid/graphics/drawable/Drawable;

    move-result-object v0

    if-eqz v0, :cond_2

    invoke-direct {p0}, Landroidx/appcompat/widget/j;->d()Z

    move-result v1

    if-eqz v1, :cond_0

    invoke-direct {p0, v0}, Landroidx/appcompat/widget/j;->b(Landroid/graphics/drawable/Drawable;)Z

    move-result v1

    if-eqz v1, :cond_0

    return-void

    :cond_0
    iget-object v1, p0, Landroidx/appcompat/widget/j;->e:Landroidx/appcompat/widget/ra;

    if-eqz v1, :cond_1

    iget-object v2, p0, Landroidx/appcompat/widget/j;->a:Landroid/view/View;

    invoke-virtual {v2}, Landroid/view/View;->getDrawableState()[I

    move-result-object v2

    invoke-static {v0, v1, v2}, Landroidx/appcompat/widget/o;->a(Landroid/graphics/drawable/Drawable;Landroidx/appcompat/widget/ra;[I)V

    goto :goto_0

    :cond_1
    iget-object v1, p0, Landroidx/appcompat/widget/j;->d:Landroidx/appcompat/widget/ra;

    if-eqz v1, :cond_2

    iget-object v2, p0, Landroidx/appcompat/widget/j;->a:Landroid/view/View;

    invoke-virtual {v2}, Landroid/view/View;->getDrawableState()[I

    move-result-object v2

    invoke-static {v0, v1, v2}, Landroidx/appcompat/widget/o;->a(Landroid/graphics/drawable/Drawable;Landroidx/appcompat/widget/ra;[I)V

    :cond_2
    :goto_0
    return-void
.end method

.method a(I)V
    .locals 2

    iput p1, p0, Landroidx/appcompat/widget/j;->c:I

    iget-object v0, p0, Landroidx/appcompat/widget/j;->b:Landroidx/appcompat/widget/o;

    if-eqz v0, :cond_0

    iget-object v1, p0, Landroidx/appcompat/widget/j;->a:Landroid/view/View;

    invoke-virtual {v1}, Landroid/view/View;->getContext()Landroid/content/Context;

    move-result-object v1

    invoke-virtual {v0, v1, p1}, Landroidx/appcompat/widget/o;->b(Landroid/content/Context;I)Landroid/content/res/ColorStateList;

    move-result-object p1

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    :goto_0
    invoke-virtual {p0, p1}, Landroidx/appcompat/widget/j;->a(Landroid/content/res/ColorStateList;)V

    invoke-virtual {p0}, Landroidx/appcompat/widget/j;->a()V

    return-void
.end method

.method a(Landroid/content/res/ColorStateList;)V
    .locals 1

    if-eqz p1, :cond_1

    iget-object v0, p0, Landroidx/appcompat/widget/j;->d:Landroidx/appcompat/widget/ra;

    if-nez v0, :cond_0

    new-instance v0, Landroidx/appcompat/widget/ra;

    invoke-direct {v0}, Landroidx/appcompat/widget/ra;-><init>()V

    iput-object v0, p0, Landroidx/appcompat/widget/j;->d:Landroidx/appcompat/widget/ra;

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/widget/j;->d:Landroidx/appcompat/widget/ra;

    iput-object p1, v0, Landroidx/appcompat/widget/ra;->a:Landroid/content/res/ColorStateList;

    const/4 p1, 0x1

    iput-boolean p1, v0, Landroidx/appcompat/widget/ra;->d:Z

    goto :goto_0

    :cond_1
    const/4 p1, 0x0

    iput-object p1, p0, Landroidx/appcompat/widget/j;->d:Landroidx/appcompat/widget/ra;

    :goto_0
    invoke-virtual {p0}, Landroidx/appcompat/widget/j;->a()V

    return-void
.end method

.method a(Landroid/graphics/PorterDuff$Mode;)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/j;->e:Landroidx/appcompat/widget/ra;

    if-nez v0, :cond_0

    new-instance v0, Landroidx/appcompat/widget/ra;

    invoke-direct {v0}, Landroidx/appcompat/widget/ra;-><init>()V

    iput-object v0, p0, Landroidx/appcompat/widget/j;->e:Landroidx/appcompat/widget/ra;

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/widget/j;->e:Landroidx/appcompat/widget/ra;

    iput-object p1, v0, Landroidx/appcompat/widget/ra;->b:Landroid/graphics/PorterDuff$Mode;

    const/4 p1, 0x1

    iput-boolean p1, v0, Landroidx/appcompat/widget/ra;->c:Z

    invoke-virtual {p0}, Landroidx/appcompat/widget/j;->a()V

    return-void
.end method

.method a(Landroid/graphics/drawable/Drawable;)V
    .locals 0

    const/4 p1, -0x1

    iput p1, p0, Landroidx/appcompat/widget/j;->c:I

    const/4 p1, 0x0

    invoke-virtual {p0, p1}, Landroidx/appcompat/widget/j;->a(Landroid/content/res/ColorStateList;)V

    invoke-virtual {p0}, Landroidx/appcompat/widget/j;->a()V

    return-void
.end method

.method a(Landroid/util/AttributeSet;I)V
    .locals 3

    iget-object v0, p0, Landroidx/appcompat/widget/j;->a:Landroid/view/View;

    invoke-virtual {v0}, Landroid/view/View;->getContext()Landroid/content/Context;

    move-result-object v0

    sget-object v1, La/a/j;->ViewBackgroundHelper:[I

    const/4 v2, 0x0

    invoke-static {v0, p1, v1, p2, v2}, Landroidx/appcompat/widget/ta;->a(Landroid/content/Context;Landroid/util/AttributeSet;[III)Landroidx/appcompat/widget/ta;

    move-result-object p1

    :try_start_0
    sget p2, La/a/j;->ViewBackgroundHelper_android_background:I

    invoke-virtual {p1, p2}, Landroidx/appcompat/widget/ta;->g(I)Z

    move-result p2

    const/4 v0, -0x1

    if-eqz p2, :cond_0

    sget p2, La/a/j;->ViewBackgroundHelper_android_background:I

    invoke-virtual {p1, p2, v0}, Landroidx/appcompat/widget/ta;->g(II)I

    move-result p2

    iput p2, p0, Landroidx/appcompat/widget/j;->c:I

    iget-object p2, p0, Landroidx/appcompat/widget/j;->b:Landroidx/appcompat/widget/o;

    iget-object v1, p0, Landroidx/appcompat/widget/j;->a:Landroid/view/View;

    invoke-virtual {v1}, Landroid/view/View;->getContext()Landroid/content/Context;

    move-result-object v1

    iget v2, p0, Landroidx/appcompat/widget/j;->c:I

    invoke-virtual {p2, v1, v2}, Landroidx/appcompat/widget/o;->b(Landroid/content/Context;I)Landroid/content/res/ColorStateList;

    move-result-object p2

    if-eqz p2, :cond_0

    invoke-virtual {p0, p2}, Landroidx/appcompat/widget/j;->a(Landroid/content/res/ColorStateList;)V

    :cond_0
    sget p2, La/a/j;->ViewBackgroundHelper_backgroundTint:I

    invoke-virtual {p1, p2}, Landroidx/appcompat/widget/ta;->g(I)Z

    move-result p2

    if-eqz p2, :cond_1

    iget-object p2, p0, Landroidx/appcompat/widget/j;->a:Landroid/view/View;

    sget v1, La/a/j;->ViewBackgroundHelper_backgroundTint:I

    invoke-virtual {p1, v1}, Landroidx/appcompat/widget/ta;->a(I)Landroid/content/res/ColorStateList;

    move-result-object v1

    invoke-static {p2, v1}, La/g/i/s;->a(Landroid/view/View;Landroid/content/res/ColorStateList;)V

    :cond_1
    sget p2, La/a/j;->ViewBackgroundHelper_backgroundTintMode:I

    invoke-virtual {p1, p2}, Landroidx/appcompat/widget/ta;->g(I)Z

    move-result p2

    if-eqz p2, :cond_2

    iget-object p2, p0, Landroidx/appcompat/widget/j;->a:Landroid/view/View;

    sget v1, La/a/j;->ViewBackgroundHelper_backgroundTintMode:I

    invoke-virtual {p1, v1, v0}, Landroidx/appcompat/widget/ta;->d(II)I

    move-result v0

    const/4 v1, 0x0

    invoke-static {v0, v1}, Landroidx/appcompat/widget/M;->a(ILandroid/graphics/PorterDuff$Mode;)Landroid/graphics/PorterDuff$Mode;

    move-result-object v0

    invoke-static {p2, v0}, La/g/i/s;->a(Landroid/view/View;Landroid/graphics/PorterDuff$Mode;)V
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    :cond_2
    invoke-virtual {p1}, Landroidx/appcompat/widget/ta;->a()V

    return-void

    :catchall_0
    move-exception p2

    invoke-virtual {p1}, Landroidx/appcompat/widget/ta;->a()V

    throw p2
.end method

.method b()Landroid/content/res/ColorStateList;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/j;->e:Landroidx/appcompat/widget/ra;

    if-eqz v0, :cond_0

    iget-object v0, v0, Landroidx/appcompat/widget/ra;->a:Landroid/content/res/ColorStateList;

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return-object v0
.end method

.method b(Landroid/content/res/ColorStateList;)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/j;->e:Landroidx/appcompat/widget/ra;

    if-nez v0, :cond_0

    new-instance v0, Landroidx/appcompat/widget/ra;

    invoke-direct {v0}, Landroidx/appcompat/widget/ra;-><init>()V

    iput-object v0, p0, Landroidx/appcompat/widget/j;->e:Landroidx/appcompat/widget/ra;

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/widget/j;->e:Landroidx/appcompat/widget/ra;

    iput-object p1, v0, Landroidx/appcompat/widget/ra;->a:Landroid/content/res/ColorStateList;

    const/4 p1, 0x1

    iput-boolean p1, v0, Landroidx/appcompat/widget/ra;->d:Z

    invoke-virtual {p0}, Landroidx/appcompat/widget/j;->a()V

    return-void
.end method

.method c()Landroid/graphics/PorterDuff$Mode;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/j;->e:Landroidx/appcompat/widget/ra;

    if-eqz v0, :cond_0

    iget-object v0, v0, Landroidx/appcompat/widget/ra;->b:Landroid/graphics/PorterDuff$Mode;

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return-object v0
.end method
