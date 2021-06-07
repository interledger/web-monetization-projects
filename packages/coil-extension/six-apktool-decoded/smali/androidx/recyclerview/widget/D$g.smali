.class public abstract Landroidx/recyclerview/widget/D$g;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/D;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x409
    name = "g"
.end annotation


# direct methods
.method public constructor <init>()V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroid/graphics/Canvas;Landroidx/recyclerview/widget/D;)V
    .locals 0
    .annotation runtime Ljava/lang/Deprecated;
    .end annotation

    return-void
.end method

.method public a(Landroid/graphics/Canvas;Landroidx/recyclerview/widget/D;Landroidx/recyclerview/widget/D$t;)V
    .locals 0

    invoke-virtual {p0, p1, p2}, Landroidx/recyclerview/widget/D$g;->a(Landroid/graphics/Canvas;Landroidx/recyclerview/widget/D;)V

    return-void
.end method

.method public a(Landroid/graphics/Rect;ILandroidx/recyclerview/widget/D;)V
    .locals 0
    .annotation runtime Ljava/lang/Deprecated;
    .end annotation

    const/4 p2, 0x0

    invoke-virtual {p1, p2, p2, p2, p2}, Landroid/graphics/Rect;->set(IIII)V

    return-void
.end method

.method public a(Landroid/graphics/Rect;Landroid/view/View;Landroidx/recyclerview/widget/D;Landroidx/recyclerview/widget/D$t;)V
    .locals 0

    invoke-virtual {p2}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object p2

    check-cast p2, Landroidx/recyclerview/widget/D$i;

    invoke-virtual {p2}, Landroidx/recyclerview/widget/D$i;->a()I

    move-result p2

    invoke-virtual {p0, p1, p2, p3}, Landroidx/recyclerview/widget/D$g;->a(Landroid/graphics/Rect;ILandroidx/recyclerview/widget/D;)V

    return-void
.end method

.method public b(Landroid/graphics/Canvas;Landroidx/recyclerview/widget/D;)V
    .locals 0
    .annotation runtime Ljava/lang/Deprecated;
    .end annotation

    return-void
.end method

.method public b(Landroid/graphics/Canvas;Landroidx/recyclerview/widget/D;Landroidx/recyclerview/widget/D$t;)V
    .locals 0

    invoke-virtual {p0, p1, p2}, Landroidx/recyclerview/widget/D$g;->b(Landroid/graphics/Canvas;Landroidx/recyclerview/widget/D;)V

    return-void
.end method
