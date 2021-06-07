.class public Landroidx/appcompat/widget/s;
.super Ljava/lang/Object;
.source ""


# instance fields
.field private final a:Landroid/widget/ImageView;

.field private b:Landroidx/appcompat/widget/ra;

.field private c:Landroidx/appcompat/widget/ra;

.field private d:Landroidx/appcompat/widget/ra;


# direct methods
.method public constructor <init>(Landroid/widget/ImageView;)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    return-void
.end method

.method private a(Landroid/graphics/drawable/Drawable;)Z
    .locals 3

    iget-object v0, p0, Landroidx/appcompat/widget/s;->d:Landroidx/appcompat/widget/ra;

    if-nez v0, :cond_0

    new-instance v0, Landroidx/appcompat/widget/ra;

    invoke-direct {v0}, Landroidx/appcompat/widget/ra;-><init>()V

    iput-object v0, p0, Landroidx/appcompat/widget/s;->d:Landroidx/appcompat/widget/ra;

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/widget/s;->d:Landroidx/appcompat/widget/ra;

    invoke-virtual {v0}, Landroidx/appcompat/widget/ra;->a()V

    iget-object v1, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-static {v1}, Landroidx/core/widget/e;->a(Landroid/widget/ImageView;)Landroid/content/res/ColorStateList;

    move-result-object v1

    const/4 v2, 0x1

    if-eqz v1, :cond_1

    iput-boolean v2, v0, Landroidx/appcompat/widget/ra;->d:Z

    iput-object v1, v0, Landroidx/appcompat/widget/ra;->a:Landroid/content/res/ColorStateList;

    :cond_1
    iget-object v1, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-static {v1}, Landroidx/core/widget/e;->b(Landroid/widget/ImageView;)Landroid/graphics/PorterDuff$Mode;

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
    iget-object v1, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-virtual {v1}, Landroid/widget/ImageView;->getDrawableState()[I

    move-result-object v1

    invoke-static {p1, v0, v1}, Landroidx/appcompat/widget/o;->a(Landroid/graphics/drawable/Drawable;Landroidx/appcompat/widget/ra;[I)V

    return v2
.end method

.method private e()Z
    .locals 4

    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/4 v1, 0x1

    const/4 v2, 0x0

    const/16 v3, 0x15

    if-le v0, v3, :cond_1

    iget-object v0, p0, Landroidx/appcompat/widget/s;->b:Landroidx/appcompat/widget/ra;

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

    iget-object v0, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-virtual {v0}, Landroid/widget/ImageView;->getDrawable()Landroid/graphics/drawable/Drawable;

    move-result-object v0

    if-eqz v0, :cond_0

    invoke-static {v0}, Landroidx/appcompat/widget/M;->b(Landroid/graphics/drawable/Drawable;)V

    :cond_0
    if-eqz v0, :cond_3

    invoke-direct {p0}, Landroidx/appcompat/widget/s;->e()Z

    move-result v1

    if-eqz v1, :cond_1

    invoke-direct {p0, v0}, Landroidx/appcompat/widget/s;->a(Landroid/graphics/drawable/Drawable;)Z

    move-result v1

    if-eqz v1, :cond_1

    return-void

    :cond_1
    iget-object v1, p0, Landroidx/appcompat/widget/s;->c:Landroidx/appcompat/widget/ra;

    if-eqz v1, :cond_2

    iget-object v2, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-virtual {v2}, Landroid/widget/ImageView;->getDrawableState()[I

    move-result-object v2

    invoke-static {v0, v1, v2}, Landroidx/appcompat/widget/o;->a(Landroid/graphics/drawable/Drawable;Landroidx/appcompat/widget/ra;[I)V

    goto :goto_0

    :cond_2
    iget-object v1, p0, Landroidx/appcompat/widget/s;->b:Landroidx/appcompat/widget/ra;

    if-eqz v1, :cond_3

    iget-object v2, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-virtual {v2}, Landroid/widget/ImageView;->getDrawableState()[I

    move-result-object v2

    invoke-static {v0, v1, v2}, Landroidx/appcompat/widget/o;->a(Landroid/graphics/drawable/Drawable;Landroidx/appcompat/widget/ra;[I)V

    :cond_3
    :goto_0
    return-void
.end method

.method public a(I)V
    .locals 1

    if-eqz p1, :cond_1

    iget-object v0, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-virtual {v0}, Landroid/widget/ImageView;->getContext()Landroid/content/Context;

    move-result-object v0

    invoke-static {v0, p1}, La/a/a/a/a;->b(Landroid/content/Context;I)Landroid/graphics/drawable/Drawable;

    move-result-object p1

    if-eqz p1, :cond_0

    invoke-static {p1}, Landroidx/appcompat/widget/M;->b(Landroid/graphics/drawable/Drawable;)V

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-virtual {v0, p1}, Landroid/widget/ImageView;->setImageDrawable(Landroid/graphics/drawable/Drawable;)V

    goto :goto_0

    :cond_1
    iget-object p1, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    const/4 v0, 0x0

    invoke-virtual {p1, v0}, Landroid/widget/ImageView;->setImageDrawable(Landroid/graphics/drawable/Drawable;)V

    :goto_0
    invoke-virtual {p0}, Landroidx/appcompat/widget/s;->a()V

    return-void
.end method

.method a(Landroid/content/res/ColorStateList;)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/s;->c:Landroidx/appcompat/widget/ra;

    if-nez v0, :cond_0

    new-instance v0, Landroidx/appcompat/widget/ra;

    invoke-direct {v0}, Landroidx/appcompat/widget/ra;-><init>()V

    iput-object v0, p0, Landroidx/appcompat/widget/s;->c:Landroidx/appcompat/widget/ra;

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/widget/s;->c:Landroidx/appcompat/widget/ra;

    iput-object p1, v0, Landroidx/appcompat/widget/ra;->a:Landroid/content/res/ColorStateList;

    const/4 p1, 0x1

    iput-boolean p1, v0, Landroidx/appcompat/widget/ra;->d:Z

    invoke-virtual {p0}, Landroidx/appcompat/widget/s;->a()V

    return-void
.end method

.method a(Landroid/graphics/PorterDuff$Mode;)V
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/s;->c:Landroidx/appcompat/widget/ra;

    if-nez v0, :cond_0

    new-instance v0, Landroidx/appcompat/widget/ra;

    invoke-direct {v0}, Landroidx/appcompat/widget/ra;-><init>()V

    iput-object v0, p0, Landroidx/appcompat/widget/s;->c:Landroidx/appcompat/widget/ra;

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/widget/s;->c:Landroidx/appcompat/widget/ra;

    iput-object p1, v0, Landroidx/appcompat/widget/ra;->b:Landroid/graphics/PorterDuff$Mode;

    const/4 p1, 0x1

    iput-boolean p1, v0, Landroidx/appcompat/widget/ra;->c:Z

    invoke-virtual {p0}, Landroidx/appcompat/widget/s;->a()V

    return-void
.end method

.method public a(Landroid/util/AttributeSet;I)V
    .locals 3

    iget-object v0, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-virtual {v0}, Landroid/widget/ImageView;->getContext()Landroid/content/Context;

    move-result-object v0

    sget-object v1, La/a/j;->AppCompatImageView:[I

    const/4 v2, 0x0

    invoke-static {v0, p1, v1, p2, v2}, Landroidx/appcompat/widget/ta;->a(Landroid/content/Context;Landroid/util/AttributeSet;[III)Landroidx/appcompat/widget/ta;

    move-result-object p1

    :try_start_0
    iget-object p2, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-virtual {p2}, Landroid/widget/ImageView;->getDrawable()Landroid/graphics/drawable/Drawable;

    move-result-object p2

    const/4 v0, -0x1

    if-nez p2, :cond_0

    sget v1, La/a/j;->AppCompatImageView_srcCompat:I

    invoke-virtual {p1, v1, v0}, Landroidx/appcompat/widget/ta;->g(II)I

    move-result v1

    if-eq v1, v0, :cond_0

    iget-object p2, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-virtual {p2}, Landroid/widget/ImageView;->getContext()Landroid/content/Context;

    move-result-object p2

    invoke-static {p2, v1}, La/a/a/a/a;->b(Landroid/content/Context;I)Landroid/graphics/drawable/Drawable;

    move-result-object p2

    if-eqz p2, :cond_0

    iget-object v1, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-virtual {v1, p2}, Landroid/widget/ImageView;->setImageDrawable(Landroid/graphics/drawable/Drawable;)V

    :cond_0
    if-eqz p2, :cond_1

    invoke-static {p2}, Landroidx/appcompat/widget/M;->b(Landroid/graphics/drawable/Drawable;)V

    :cond_1
    sget p2, La/a/j;->AppCompatImageView_tint:I

    invoke-virtual {p1, p2}, Landroidx/appcompat/widget/ta;->g(I)Z

    move-result p2

    if-eqz p2, :cond_2

    iget-object p2, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    sget v1, La/a/j;->AppCompatImageView_tint:I

    invoke-virtual {p1, v1}, Landroidx/appcompat/widget/ta;->a(I)Landroid/content/res/ColorStateList;

    move-result-object v1

    invoke-static {p2, v1}, Landroidx/core/widget/e;->a(Landroid/widget/ImageView;Landroid/content/res/ColorStateList;)V

    :cond_2
    sget p2, La/a/j;->AppCompatImageView_tintMode:I

    invoke-virtual {p1, p2}, Landroidx/appcompat/widget/ta;->g(I)Z

    move-result p2

    if-eqz p2, :cond_3

    iget-object p2, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    sget v1, La/a/j;->AppCompatImageView_tintMode:I

    invoke-virtual {p1, v1, v0}, Landroidx/appcompat/widget/ta;->d(II)I

    move-result v0

    const/4 v1, 0x0

    invoke-static {v0, v1}, Landroidx/appcompat/widget/M;->a(ILandroid/graphics/PorterDuff$Mode;)Landroid/graphics/PorterDuff$Mode;

    move-result-object v0

    invoke-static {p2, v0}, Landroidx/core/widget/e;->a(Landroid/widget/ImageView;Landroid/graphics/PorterDuff$Mode;)V
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    :cond_3
    invoke-virtual {p1}, Landroidx/appcompat/widget/ta;->a()V

    return-void

    :catchall_0
    move-exception p2

    invoke-virtual {p1}, Landroidx/appcompat/widget/ta;->a()V

    throw p2
.end method

.method b()Landroid/content/res/ColorStateList;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/s;->c:Landroidx/appcompat/widget/ra;

    if-eqz v0, :cond_0

    iget-object v0, v0, Landroidx/appcompat/widget/ra;->a:Landroid/content/res/ColorStateList;

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return-object v0
.end method

.method c()Landroid/graphics/PorterDuff$Mode;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/s;->c:Landroidx/appcompat/widget/ra;

    if-eqz v0, :cond_0

    iget-object v0, v0, Landroidx/appcompat/widget/ra;->b:Landroid/graphics/PorterDuff$Mode;

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return-object v0
.end method

.method d()Z
    .locals 3

    iget-object v0, p0, Landroidx/appcompat/widget/s;->a:Landroid/widget/ImageView;

    invoke-virtual {v0}, Landroid/widget/ImageView;->getBackground()Landroid/graphics/drawable/Drawable;

    move-result-object v0

    sget v1, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v2, 0x15

    if-lt v1, v2, :cond_0

    instance-of v0, v0, Landroid/graphics/drawable/RippleDrawable;

    if-eqz v0, :cond_0

    const/4 v0, 0x0

    return v0

    :cond_0
    const/4 v0, 0x1

    return v0
.end method
