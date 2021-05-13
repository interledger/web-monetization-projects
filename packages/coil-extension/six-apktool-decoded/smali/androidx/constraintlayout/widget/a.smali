.class public Landroidx/constraintlayout/widget/a;
.super Landroidx/constraintlayout/widget/b;
.source ""


# instance fields
.field private g:I

.field private h:I

.field private i:La/e/a/a/b;


# direct methods
.method public constructor <init>(Landroid/content/Context;)V
    .locals 0

    invoke-direct {p0, p1}, Landroidx/constraintlayout/widget/b;-><init>(Landroid/content/Context;)V

    const/16 p1, 0x8

    invoke-super {p0, p1}, Landroid/view/View;->setVisibility(I)V

    return-void
.end method


# virtual methods
.method protected a(Landroid/util/AttributeSet;)V
    .locals 6

    invoke-super {p0, p1}, Landroidx/constraintlayout/widget/b;->a(Landroid/util/AttributeSet;)V

    new-instance v0, La/e/a/a/b;

    invoke-direct {v0}, La/e/a/a/b;-><init>()V

    iput-object v0, p0, Landroidx/constraintlayout/widget/a;->i:La/e/a/a/b;

    if-eqz p1, :cond_2

    invoke-virtual {p0}, Landroid/view/View;->getContext()Landroid/content/Context;

    move-result-object v0

    sget-object v1, Landroidx/constraintlayout/widget/i;->ConstraintLayout_Layout:[I

    invoke-virtual {v0, p1, v1}, Landroid/content/Context;->obtainStyledAttributes(Landroid/util/AttributeSet;[I)Landroid/content/res/TypedArray;

    move-result-object p1

    invoke-virtual {p1}, Landroid/content/res/TypedArray;->getIndexCount()I

    move-result v0

    const/4 v1, 0x0

    move v2, v1

    :goto_0
    if-ge v2, v0, :cond_2

    invoke-virtual {p1, v2}, Landroid/content/res/TypedArray;->getIndex(I)I

    move-result v3

    sget v4, Landroidx/constraintlayout/widget/i;->ConstraintLayout_Layout_barrierDirection:I

    if-ne v3, v4, :cond_0

    invoke-virtual {p1, v3, v1}, Landroid/content/res/TypedArray;->getInt(II)I

    move-result v3

    invoke-virtual {p0, v3}, Landroidx/constraintlayout/widget/a;->setType(I)V

    goto :goto_1

    :cond_0
    sget v4, Landroidx/constraintlayout/widget/i;->ConstraintLayout_Layout_barrierAllowsGoneWidgets:I

    if-ne v3, v4, :cond_1

    iget-object v4, p0, Landroidx/constraintlayout/widget/a;->i:La/e/a/a/b;

    const/4 v5, 0x1

    invoke-virtual {p1, v3, v5}, Landroid/content/res/TypedArray;->getBoolean(IZ)Z

    move-result v3

    invoke-virtual {v4, v3}, La/e/a/a/b;->c(Z)V

    :cond_1
    :goto_1
    add-int/lit8 v2, v2, 0x1

    goto :goto_0

    :cond_2
    iget-object p1, p0, Landroidx/constraintlayout/widget/a;->i:La/e/a/a/b;

    iput-object p1, p0, Landroidx/constraintlayout/widget/b;->d:La/e/a/a/m;

    invoke-virtual {p0}, Landroidx/constraintlayout/widget/b;->a()V

    return-void
.end method

.method public getType()I
    .locals 1

    iget v0, p0, Landroidx/constraintlayout/widget/a;->g:I

    return v0
.end method

.method public setAllowsGoneWidget(Z)V
    .locals 1

    iget-object v0, p0, Landroidx/constraintlayout/widget/a;->i:La/e/a/a/b;

    invoke-virtual {v0, p1}, La/e/a/a/b;->c(Z)V

    return-void
.end method

.method public setType(I)V
    .locals 5

    iput p1, p0, Landroidx/constraintlayout/widget/a;->g:I

    iput p1, p0, Landroidx/constraintlayout/widget/a;->h:I

    sget p1, Landroid/os/Build$VERSION;->SDK_INT:I

    const/4 v0, 0x6

    const/4 v1, 0x5

    const/4 v2, 0x0

    const/4 v3, 0x1

    const/16 v4, 0x11

    if-ge p1, v4, :cond_1

    iget p1, p0, Landroidx/constraintlayout/widget/a;->g:I

    if-ne p1, v1, :cond_0

    :goto_0
    iput v2, p0, Landroidx/constraintlayout/widget/a;->h:I

    goto :goto_3

    :cond_0
    if-ne p1, v0, :cond_6

    :goto_1
    iput v3, p0, Landroidx/constraintlayout/widget/a;->h:I

    goto :goto_3

    :cond_1
    invoke-virtual {p0}, Landroid/view/View;->getResources()Landroid/content/res/Resources;

    move-result-object p1

    invoke-virtual {p1}, Landroid/content/res/Resources;->getConfiguration()Landroid/content/res/Configuration;

    move-result-object p1

    invoke-virtual {p1}, Landroid/content/res/Configuration;->getLayoutDirection()I

    move-result p1

    if-ne v3, p1, :cond_2

    move p1, v3

    goto :goto_2

    :cond_2
    move p1, v2

    :goto_2
    if-eqz p1, :cond_4

    iget p1, p0, Landroidx/constraintlayout/widget/a;->g:I

    if-ne p1, v1, :cond_3

    goto :goto_1

    :cond_3
    if-ne p1, v0, :cond_6

    goto :goto_0

    :cond_4
    iget p1, p0, Landroidx/constraintlayout/widget/a;->g:I

    if-ne p1, v1, :cond_5

    goto :goto_0

    :cond_5
    if-ne p1, v0, :cond_6

    goto :goto_1

    :cond_6
    :goto_3
    iget-object p1, p0, Landroidx/constraintlayout/widget/a;->i:La/e/a/a/b;

    iget v0, p0, Landroidx/constraintlayout/widget/a;->h:I

    invoke-virtual {p1, v0}, La/e/a/a/b;->t(I)V

    return-void
.end method
