.class public La/c/a/a;
.super Landroid/widget/FrameLayout;
.source ""


# static fields
.field private static final a:[I

.field private static final b:La/c/a/h;


# instance fields
.field private c:Z

.field private d:Z

.field e:I

.field f:I

.field final g:Landroid/graphics/Rect;

.field private final h:La/c/a/g;


# direct methods
.method static constructor <clinit>()V
    .locals 3

    const/4 v0, 0x1

    new-array v0, v0, [I

    const/4 v1, 0x0

    const v2, 0x1010031

    aput v2, v0, v1

    sput-object v0, La/c/a/a;->a:[I

    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v1, 0x15

    if-lt v0, v1, :cond_0

    new-instance v0, La/c/a/d;

    invoke-direct {v0}, La/c/a/d;-><init>()V

    :goto_0
    sput-object v0, La/c/a/a;->b:La/c/a/h;

    goto :goto_1

    :cond_0
    const/16 v1, 0x11

    if-lt v0, v1, :cond_1

    new-instance v0, La/c/a/c;

    invoke-direct {v0}, La/c/a/c;-><init>()V

    goto :goto_0

    :cond_1
    new-instance v0, La/c/a/f;

    invoke-direct {v0}, La/c/a/f;-><init>()V

    goto :goto_0

    :goto_1
    sget-object v0, La/c/a/a;->b:La/c/a/h;

    invoke-interface {v0}, La/c/a/h;->a()V

    return-void
.end method


# virtual methods
.method public getCardBackgroundColor()Landroid/content/res/ColorStateList;
    .locals 2

    sget-object v0, La/c/a/a;->b:La/c/a/h;

    iget-object v1, p0, La/c/a/a;->h:La/c/a/g;

    invoke-interface {v0, v1}, La/c/a/h;->e(La/c/a/g;)Landroid/content/res/ColorStateList;

    move-result-object v0

    return-object v0
.end method

.method public getCardElevation()F
    .locals 2

    sget-object v0, La/c/a/a;->b:La/c/a/h;

    iget-object v1, p0, La/c/a/a;->h:La/c/a/g;

    invoke-interface {v0, v1}, La/c/a/h;->a(La/c/a/g;)F

    move-result v0

    return v0
.end method

.method public getContentPaddingBottom()I
    .locals 1

    iget-object v0, p0, La/c/a/a;->g:Landroid/graphics/Rect;

    iget v0, v0, Landroid/graphics/Rect;->bottom:I

    return v0
.end method

.method public getContentPaddingLeft()I
    .locals 1

    iget-object v0, p0, La/c/a/a;->g:Landroid/graphics/Rect;

    iget v0, v0, Landroid/graphics/Rect;->left:I

    return v0
.end method

.method public getContentPaddingRight()I
    .locals 1

    iget-object v0, p0, La/c/a/a;->g:Landroid/graphics/Rect;

    iget v0, v0, Landroid/graphics/Rect;->right:I

    return v0
.end method

.method public getContentPaddingTop()I
    .locals 1

    iget-object v0, p0, La/c/a/a;->g:Landroid/graphics/Rect;

    iget v0, v0, Landroid/graphics/Rect;->top:I

    return v0
.end method

.method public getMaxCardElevation()F
    .locals 2

    sget-object v0, La/c/a/a;->b:La/c/a/h;

    iget-object v1, p0, La/c/a/a;->h:La/c/a/g;

    invoke-interface {v0, v1}, La/c/a/h;->d(La/c/a/g;)F

    move-result v0

    return v0
.end method

.method public getPreventCornerOverlap()Z
    .locals 1

    iget-boolean v0, p0, La/c/a/a;->d:Z

    return v0
.end method

.method public getRadius()F
    .locals 2

    sget-object v0, La/c/a/a;->b:La/c/a/h;

    iget-object v1, p0, La/c/a/a;->h:La/c/a/g;

    invoke-interface {v0, v1}, La/c/a/h;->b(La/c/a/g;)F

    move-result v0

    return v0
.end method

.method public getUseCompatPadding()Z
    .locals 1

    iget-boolean v0, p0, La/c/a/a;->c:Z

    return v0
.end method

.method protected onMeasure(II)V
    .locals 5

    sget-object v0, La/c/a/a;->b:La/c/a/h;

    instance-of v0, v0, La/c/a/d;

    if-nez v0, :cond_2

    invoke-static {p1}, Landroid/view/View$MeasureSpec;->getMode(I)I

    move-result v0

    const/high16 v1, 0x40000000    # 2.0f

    const/high16 v2, -0x80000000

    if-eq v0, v2, :cond_0

    if-eq v0, v1, :cond_0

    goto :goto_0

    :cond_0
    sget-object v3, La/c/a/a;->b:La/c/a/h;

    iget-object v4, p0, La/c/a/a;->h:La/c/a/g;

    invoke-interface {v3, v4}, La/c/a/h;->g(La/c/a/g;)F

    move-result v3

    float-to-double v3, v3

    invoke-static {v3, v4}, Ljava/lang/Math;->ceil(D)D

    move-result-wide v3

    double-to-int v3, v3

    invoke-static {p1}, Landroid/view/View$MeasureSpec;->getSize(I)I

    move-result p1

    invoke-static {v3, p1}, Ljava/lang/Math;->max(II)I

    move-result p1

    invoke-static {p1, v0}, Landroid/view/View$MeasureSpec;->makeMeasureSpec(II)I

    move-result p1

    :goto_0
    invoke-static {p2}, Landroid/view/View$MeasureSpec;->getMode(I)I

    move-result v0

    if-eq v0, v2, :cond_1

    if-eq v0, v1, :cond_1

    goto :goto_1

    :cond_1
    sget-object v1, La/c/a/a;->b:La/c/a/h;

    iget-object v2, p0, La/c/a/a;->h:La/c/a/g;

    invoke-interface {v1, v2}, La/c/a/h;->f(La/c/a/g;)F

    move-result v1

    float-to-double v1, v1

    invoke-static {v1, v2}, Ljava/lang/Math;->ceil(D)D

    move-result-wide v1

    double-to-int v1, v1

    invoke-static {p2}, Landroid/view/View$MeasureSpec;->getSize(I)I

    move-result p2

    invoke-static {v1, p2}, Ljava/lang/Math;->max(II)I

    move-result p2

    invoke-static {p2, v0}, Landroid/view/View$MeasureSpec;->makeMeasureSpec(II)I

    move-result p2

    :cond_2
    :goto_1
    invoke-super {p0, p1, p2}, Landroid/widget/FrameLayout;->onMeasure(II)V

    return-void
.end method

.method public setCardBackgroundColor(I)V
    .locals 2

    sget-object v0, La/c/a/a;->b:La/c/a/h;

    iget-object v1, p0, La/c/a/a;->h:La/c/a/g;

    invoke-static {p1}, Landroid/content/res/ColorStateList;->valueOf(I)Landroid/content/res/ColorStateList;

    move-result-object p1

    invoke-interface {v0, v1, p1}, La/c/a/h;->a(La/c/a/g;Landroid/content/res/ColorStateList;)V

    return-void
.end method

.method public setCardBackgroundColor(Landroid/content/res/ColorStateList;)V
    .locals 2

    sget-object v0, La/c/a/a;->b:La/c/a/h;

    iget-object v1, p0, La/c/a/a;->h:La/c/a/g;

    invoke-interface {v0, v1, p1}, La/c/a/h;->a(La/c/a/g;Landroid/content/res/ColorStateList;)V

    return-void
.end method

.method public setCardElevation(F)V
    .locals 2

    sget-object v0, La/c/a/a;->b:La/c/a/h;

    iget-object v1, p0, La/c/a/a;->h:La/c/a/g;

    invoke-interface {v0, v1, p1}, La/c/a/h;->b(La/c/a/g;F)V

    return-void
.end method

.method public setMaxCardElevation(F)V
    .locals 2

    sget-object v0, La/c/a/a;->b:La/c/a/h;

    iget-object v1, p0, La/c/a/a;->h:La/c/a/g;

    invoke-interface {v0, v1, p1}, La/c/a/h;->c(La/c/a/g;F)V

    return-void
.end method

.method public setMinimumHeight(I)V
    .locals 0

    iput p1, p0, La/c/a/a;->f:I

    invoke-super {p0, p1}, Landroid/widget/FrameLayout;->setMinimumHeight(I)V

    return-void
.end method

.method public setMinimumWidth(I)V
    .locals 0

    iput p1, p0, La/c/a/a;->e:I

    invoke-super {p0, p1}, Landroid/widget/FrameLayout;->setMinimumWidth(I)V

    return-void
.end method

.method public setPadding(IIII)V
    .locals 0

    return-void
.end method

.method public setPaddingRelative(IIII)V
    .locals 0

    return-void
.end method

.method public setPreventCornerOverlap(Z)V
    .locals 1

    iget-boolean v0, p0, La/c/a/a;->d:Z

    if-eq p1, v0, :cond_0

    iput-boolean p1, p0, La/c/a/a;->d:Z

    sget-object p1, La/c/a/a;->b:La/c/a/h;

    iget-object v0, p0, La/c/a/a;->h:La/c/a/g;

    invoke-interface {p1, v0}, La/c/a/h;->h(La/c/a/g;)V

    :cond_0
    return-void
.end method

.method public setRadius(F)V
    .locals 2

    sget-object v0, La/c/a/a;->b:La/c/a/h;

    iget-object v1, p0, La/c/a/a;->h:La/c/a/g;

    invoke-interface {v0, v1, p1}, La/c/a/h;->a(La/c/a/g;F)V

    return-void
.end method

.method public setUseCompatPadding(Z)V
    .locals 1

    iget-boolean v0, p0, La/c/a/a;->c:Z

    if-eq v0, p1, :cond_0

    iput-boolean p1, p0, La/c/a/a;->c:Z

    sget-object p1, La/c/a/a;->b:La/c/a/h;

    iget-object v0, p0, La/c/a/a;->h:La/c/a/g;

    invoke-interface {p1, v0}, La/c/a/h;->c(La/c/a/g;)V

    :cond_0
    return-void
.end method
